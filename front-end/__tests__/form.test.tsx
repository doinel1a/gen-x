/* eslint-disable sonarjs/no-duplicate-string */
/* eslint-disable testing-library/no-node-access */
import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import '@testing-library/jest-dom';
import SmartContractForm from '@/components/smart-contract-form';

describe('Form - Rendering', () => {
  it('Should have a Input labbeled by "Address"', () => {
    render(<SmartContractForm />);

    const addressInput = screen.getByLabelText('Address');

    expect(addressInput).toBeInTheDocument();
  });

  it('Should have a Input labelled by "ABI file"', () => {
    render(<SmartContractForm />);

    const abiFileInput = screen.getByLabelText('ABI file');

    expect(abiFileInput).toBeInTheDocument();
  });

  it('Should have a Button w/ "Generate" text', () => {
    render(<SmartContractForm />);

    const generateButton = screen.getByRole('button');
    const generateButtonText = generateButton.textContent;

    expect(generateButton).toBeInTheDocument();
    expect(generateButtonText).toBe('Generate');
  });
});

describe('Form - Interaction', () => {
  describe('Address input', () => {
    describe('Click "Generate" Button w/ input value ""', () => {
      it('Should have "Address is required" error message', async () => {
        render(<SmartContractForm />);

        const addressInputLabel = screen.getByText('Address');
        const generateButton = screen.getByRole('button');

        await userEvent.click(generateButton);

        const addressInputErrorMessage = addressInputLabel.nextSibling?.textContent;

        expect(addressInputErrorMessage).toMatch(/is required/);
      });
    });

    describe('Click "Generate" Button w/ input value " "', () => {
      it('Should have "Address is required" error message', async () => {
        render(<SmartContractForm />);

        const addressInputLabel = screen.getByText('Address');
        const addressInput = screen.getByLabelText('Address');
        const generateButton = screen.getByRole('button');

        await userEvent.type(addressInput, ' ');
        await userEvent.click(generateButton);

        const addressInputErrorMessage = addressInputLabel.nextSibling?.textContent;

        expect(addressInputErrorMessage).toMatch(/is required/);
      });
    });

    describe('Click "Generate" Button w/ input value length 61 chars', () => {
      it('Should have "Address must be 62 characters long" error message', async () => {
        render(<SmartContractForm />);

        const addressInputLabel = screen.getByText('Address');
        const addressInput = screen.getByLabelText('Address');
        const generateButton = screen.getByRole('button');

        // 61 chars long
        const input = 'erd1qqqqaqqqqqeqqpgqtsw0630ynu4k769u025km90z2u32896cy9vqc0zfu';

        await userEvent.type(addressInput, input);
        await userEvent.click(generateButton);

        const addressInputErrorMessage = addressInputLabel.nextSibling?.textContent;

        expect(addressInputErrorMessage).toMatch(/must be 62 characters long/);
      });
    });

    describe('Click "Generate" Button w/ input value length 63 chars', () => {
      it('Should have "Address must be 62 characters long" error message', async () => {
        render(<SmartContractForm />);

        const addressInputLabel = screen.getByText('Address');
        const addressInput = screen.getByLabelText('Address');
        const generateButton = screen.getByRole('button');

        // 63 chars long
        const input = 'erd1qqqqaqqqqqeqqpgqtsw0630ynu4k769u025km90z2u32896cy9vqc0zfust';

        await userEvent.type(addressInput, input);
        await userEvent.click(generateButton);

        const addressInputErrorMessage = addressInputLabel.nextSibling?.textContent;

        expect(addressInputErrorMessage).toMatch(/must be 62 characters long/);
      });
    });

    describe('Click "Generate" Button w/ input value !^erd1', () => {
      it('Should have "Address must start with "erd1"" error message', async () => {
        render(<SmartContractForm />);

        const addressInputLabel = screen.getByText('Address');
        const addressInput = screen.getByLabelText('Address');
        const generateButton = screen.getByRole('button');

        const input = 'erd2qqqqaqqqqqeqqpgqtsw0630ynu4k769u025km90z2u32896cy9vqc0zfus';

        await userEvent.type(addressInput, input);
        await userEvent.click(generateButton);

        const addressInputErrorMessage = addressInputLabel.nextSibling?.textContent;

        expect(addressInputErrorMessage).toMatch(/must start with "erd1"/);
      });
    });

    describe('Click "Generate" Button w/ input value /special chars/', () => {
      it('Should have "Address must not contain special characters" error message', async () => {
        render(<SmartContractForm />);

        const addressInputLabel = screen.getByText('Address');
        const addressInput = screen.getByLabelText('Address');
        const generateButton = screen.getByRole('button');

        const input = 'erd1qqqqaqqqqqeqqpgqtsw0630ynu4k769u025km90z2u32896cy9vqc0zfu!';

        await userEvent.type(addressInput, input);
        await userEvent.click(generateButton);

        const addressInputErrorMessage = addressInputLabel.nextSibling?.textContent;

        expect(addressInputErrorMessage).toMatch(/must not contain special characters/);
      });
    });
  });

  describe('ABI file input', () => {
    describe('Click "Generate" Button w/ no input file', () => {
      it('Should have "ABI file is required" error message', async () => {
        render(<SmartContractForm />);

        const abiFileInputLabel = screen.getByText('ABI file');
        const abiFileInput = screen.getByLabelText('ABI file');
        const generateButton = screen.getByRole('button');

        fireEvent.change(abiFileInput, {
          target: { files: [] }
        });

        await userEvent.click(generateButton);

        const abiFileInputErrorMessage = abiFileInputLabel.nextSibling?.textContent;

        expect(abiFileInputErrorMessage).toMatch(/is required/);
      });
    });

    describe('Click "Generate" Button w/ input file !/.abi/', () => {
      it('Should have "ABI file must be valid - should contain ".abi" in its name" error message', async () => {
        render(<SmartContractForm />);

        const abiFileInputLabel = screen.getByText('ABI file');
        const abiFileInput = screen.getByLabelText('ABI file');
        const generateButton = screen.getByRole('button');

        const input = [new Blob(['you construct a file...']), ' Same way as you do with blob'];

        await userEvent.upload(
          abiFileInput,
          new File(input, 'contract.json', { type: 'application/json' })
        );
        await userEvent.click(generateButton);

        const abiFileInputErrorMessage = abiFileInputLabel.nextSibling?.textContent;

        expect(abiFileInputErrorMessage).toMatch(
          /must be valid - should contain ".abi" in its name/
        );
      });
    });

    describe('Click "Generate" Button w/ input file size > 1 MB', () => {
      it('Should have "ABI file must be less than 1MB"', async () => {
        render(<SmartContractForm />);

        const abiFileInputLabel = screen.getByText('ABI file');
        const abiFileInput = screen.getByLabelText('ABI file');
        const generateButton = screen.getByRole('button');

        const input = createLargeFile(1024 * 1024);

        await userEvent.upload(
          abiFileInput,
          new File(input, 'contract.abi.json', { type: 'application/jsonn' })
        );
        await userEvent.click(generateButton);

        const abiFileInputErrorMessage = abiFileInputLabel.nextSibling?.textContent;

        expect(abiFileInputErrorMessage).toMatch(/must be less than 1MB/);
      });
    });

    describe('Click "Generate" Button w/ input file !json', () => {
      it('Should have "ABI file must be a JSON file" error message', async () => {
        render(<SmartContractForm />);

        const abiFileInputLabel = screen.getByText('ABI file');
        const abiFileInput = screen.getByLabelText('ABI file');
        const generateButton = screen.getByRole('button');

        const input = [new Blob(['you construct a file...']), ' Same way as you do with blob'];

        await userEvent.upload(
          abiFileInput,
          new File(input, 'contract.abi.json', { type: 'application/jsonn' })
        );
        await userEvent.click(generateButton);

        const abiFileInputErrorMessage = abiFileInputLabel.nextSibling?.textContent;

        expect(abiFileInputErrorMessage).toMatch(/must be a JSON file/);
      });
    });
  });
});

function createLargeFile(sizeInBytes: number) {
  const buffer = new ArrayBuffer(sizeInBytes);

  return [
    new Blob(['you construct a file...']),
    new File([buffer], 'contract.abi.json', {
      type: 'application/json'
    })
  ];
}
