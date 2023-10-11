/* eslint-disable indent */
import * as z from 'zod';

const FIRST_FOUR_CHARS = 'erd1';
const NO_SPECIAL_CHARS_REGEX = /^[\dA-Za-z]+$/;
const FILE_TYPE = 'application/json';
const MAX_FILE_SIZE = 1_000_000; // 1MB

const SmartContractSchema = z.object({
  address: z
    .string({
      required_error: 'must be a string'
    })
    .trim()
    .min(1, 'is required')
    .max(62, 'must be 62 characters long')
    .length(62, 'must be 62 characters long')
    .refine(
      (string) => {
        const firstFourChars = string.slice(0, 4);

        return firstFourChars === FIRST_FOUR_CHARS;
      },
      { message: 'must start with "erd1"' }
    )
    .refine(
      (string) => {
        return NO_SPECIAL_CHARS_REGEX.test(string);
      },
      { message: 'must not contain special characters' }
    ),
  abi:
    typeof window === 'undefined'
      ? z.undefined()
      : z
          .instanceof(FileList)
          .refine(
            (files) => {
              return files?.length !== 0;
            },
            {
              message: 'is required'
            }
          )
          .refine(
            (files) => {
              if (files[0]) {
                const { name } = files[0];

                return name.includes('.abi');
              }
            },
            { message: 'must be valid - should contain ".abi" in its name' }
          )
          .refine(
            (files) => {
              if (files[0]) {
                const { size } = files[0];

                return size < MAX_FILE_SIZE;
              }
            },
            { message: 'must be less than 1MB' }
          )
          .refine(
            (files) => {
              if (files[0]) {
                const { type } = files[0];

                return type === FILE_TYPE;
              }
            },
            { message: 'must be a JSON file' }
          )
});

export type SmartContractType = z.infer<typeof SmartContractSchema>;

export { SmartContractSchema };
