import { Request, Response, NextFunction } from 'express';

interface CustomError extends Error {
  code?: number;
}

interface AsyncHandlerFunction {
  (req: Request, res: Response, next: NextFunction): Promise<any>;
}

const asyncHandler = (
  fun: AsyncHandlerFunction
) => async (req: Request, res: Response, next: NextFunction) => {
  try {
    await fun(req, res, next);
  } catch (error: unknown) {
    const customError = error as CustomError;
    res
      .status(customError.code || 500)
      .json({ message: customError.message || 'Internal Server Error', success: false });
  }
};

const asyncHandlerPromise = (
    fun: AsyncHandlerFunction
) => async (req: Request, res: Response, next: NextFunction) => {
    try {
        await fun(req, res, next);

    } catch (error: unknown) {
        const customError = error as CustomError;
        res
          .status(customError.code || 500)
          .json({ message: customError.message || 'Internal Server Error', success: false });


    }
};

export default asyncHandler;
