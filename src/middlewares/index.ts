import express from "express";
import {get, merge} from 'lodash';
import { getUserBySessionToken } from "../db/users";

/**
 * Middleware function to check if the authenticated user is the owner of the requested resource.
 * It checks if the authenticated user's ID matches the ID parameter in the request.
 * If the user is not authenticated or is not the owner, it responds with a 403 Forbidden status.
 * Otherwise, it calls the next middleware function.
 */ export const isOwner = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const { id } = req.params;
    const currentUserId = get(req, "identity._id") as string;
    if (!currentUserId) {
      return res.sendStatus(403);
    }
    if (currentUserId.toString() != id) {
      return res.sendStatus(403);
    }
    next();
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};

/**
 * Middleware function to check if the user is authenticated.
 * It checks if the request has a valid session token in the cookies.
 * If the session token is not present or is invalid, it responds with a 403 Forbidden status.
 * If the session token is valid, it attaches the user object to the request object and calls the next middleware function.
 */ export const isAuthenticated = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const sessionToken = req.cookies["RAM-AUTH"];
    if (!sessionToken) {
      return res.sendStatus(403);
    }
    const existingUser = await getUserBySessionToken(sessionToken);
    if (!existingUser) {
      return res.sendStatus(403);
    }
    merge(req, { identity: existingUser });
    return next();
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};
