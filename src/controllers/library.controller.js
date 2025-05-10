import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

import library from "./shloka2.js";


const getBGShloka = (req, res) => {
  const { chapter, shloka } = req.params;

  if (!chapter) {
    throw new ApiError(404, "Bhagvad Gita's Chapter Number missing!");
  }

  if (!shloka) {
    throw new ApiError(404, "Bhagvad Gita's Shloka Number missing!");
  }
  if (!library || typeof library !== 'object') {
    throw new ApiError(500, "Internal server error: library not found");
  } else if (!library.hasOwnProperty("bg")) {
      throw new ApiError(404, "Bhagavad Gita not found in library");
  } else if (!library["bg"].hasOwnProperty(chapter)) {
      throw new ApiError(404, `Chapter ${chapter} not found in Bhagavad Gita`);
  } else if (!library["bg"][chapter]["verses"].hasOwnProperty(shloka)) {
      throw new ApiError(404, `Shloka number ${shloka} not found in chapter ${chapter}`);
  }

  let data = library["bg"][chapter]["verses"][shloka];

  return res
    .status(201)
    .json(
      new ApiResponse(
        201,
        data,
        `Bhagvad Gita's content for Chapter=${chapter} Shloka=${shloka} loaded successfully!`
      )
    );
};

const getBGChapter = (req, res) => {
  const { chapter } = req.params;

  if (!chapter) {
    throw new ApiError(404, "Bhagvad Gita's Chapter Number missing!");
  }

  
  if (!library || typeof library !== 'object') {
    throw new ApiError(500, "Internal server error: library not found");
  } else if (!library.hasOwnProperty("bg")) {
      throw new ApiError(404, "Bhagavad Gita not found in library");
  } else if (!library["bg"].hasOwnProperty(chapter)) {
      throw new ApiError(404, `Chapter ${chapter} not found in Bhagavad Gita`);
  }

  let data = library["bg"][chapter];

  return res
    .status(201)
    .json(
      new ApiResponse(
        201,
        data,
        `Bhagvad Gita's content for Chapter=${chapter} loaded successfully!`
      )
    );
};

export {getBGShloka, getBGChapter };
