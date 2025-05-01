import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

import library from "./shloka.js";


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
  } else if (!library["bg"][chapter].hasOwnProperty(shloka)) {
      throw new ApiError(404, `Shloka number ${shloka} not found in chapter ${chapter}`);
  }

  let data = library["bg"][chapter][shloka];

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

export {getBGShloka};















// import library from "./shloka.js";

// const getShloka = asyncHandler(async (req, res) => {
//   const { book, context, number } = req.body;

//   // Validation for required fields
//   if (!book) throw new ApiError(400, "Book is required!");
//   if (!context) throw new ApiError(400, "Context/Title/Chapter-Name is required!");
//   if (!number) throw new ApiError(400, "Shloka Number is required!");

//   // Check for existing user
//   const existingUser = await User.findOne({ $or: [ { username }] });
//   if (existingUser) {
//     throw new ApiError(
//       409,
//       "User with the given username/email already exists!"
//     );
//   }

//   return res
//     .status(201)
//     .json(new ApiResponse(201, library[book][], "User Registered Successfully!"));
// });

// const getBGShloka = (req, res) => {
//   const { chapter, shloka } = req.params;

//   if (!chapter) {
//     throw new ApiError(409, "Bhagvad Gita's Chapter Number missing!");
//   }

//   if (!shloka) {
//     throw new ApiError(409, "Bhagvad Gita's Shloka Number missing!");
//   }

//   // try {
//   //   const allChapters = predefinedData["bg"].a[parseInt(aIndex)];
//   //   if (!allChapters) {
     
//   //   throw new ApiError(
//   //     409,
//   //     "User with the given username/email already exists!"
//   //   );
//   //   }

//   //   const bKey = Object.keys(aItem)[0]; // Assuming 'b' is the first key at this level
//   //   const bItem = aItem[bKey][parseInt(bIndex)];
//   //   if (!bItem) {
//   //     return res
//   //       .status(404)
//   //       .json({ error: 'Item not found at the "b" level.' });
//   //   }

//   //   if (!bItem[cKey]) {
//   //     return res
//   //       .status(404)
//   //       .json({ error: `Key "${cKey}" not found at the "c" level.` });
//   //   }

//   //   const selectedItem = bItem[cKey];
//   //   res.status(200).json(selectedItem);
//   // } catch (error) {
//   //   console.error("Error fetching item:", error);
//   //   res.status(500).json({ error: "Internal server error." });
//   // }

//   return res
//     .status(201)
//     .json(
//       new ApiResponse(
//         201,
//         library["bg"][chapter][shloka],
//         `Bhagvad Gita's content for Chapter=${chapter} Shloka=${shloka} loaded successfully!`
//       )
//     );
// };



// export { getFromLibrary };
