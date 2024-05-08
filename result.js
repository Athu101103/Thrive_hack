const { PDFDocument } = require('pdf-lib');
const { writeFile , readFile} = require('fs/promises');

async function fillPdfForm(fieldsData, inputPdfPath, outputPdfPath) {
    try {
        const pdfDoc = await PDFDocument.load(await readFile(inputPdfPath));
        const form = pdfDoc.getForm();
        for (const { fieldName, fieldValue } of fieldsData) {
            try {
                const formField = form.getTextField(fieldName) || form.getDropdown(fieldName) || form.getCheckbox(fieldName);
                if (formField) {
                    formField.setText(fieldValue.toString());
                } else {
                    console.log(`Field '${fieldName}' not found in PDF form.`);
                }
            } catch (error) {
                console.log(`Error filling field '${fieldName}': ${error.message}`);
            }
        }

        const pdfBytes = await pdfDoc.save();
        await writeFile(outputPdfPath, pdfBytes);
        
        console.log(`PDF form filled successfully. Output saved to: ${outputPdfPath}`);
    } catch (error) {
        console.log(`An error occurred: ${error}`);
    }
}

const fieldsData = [
    { fieldName: "Health Number", fieldValue: "123456789" },
    { fieldName: "Sex", fieldValue: "Male" },
    { fieldName: "Code", fieldValue: "A1" },
    { fieldName: "myself", fieldValue: "Yes" },
    { fieldName: "children", fieldValue: "No" },
    { fieldName: "dependent adults", fieldValue: "No" },
    { fieldName: "Second Name of adult patient", fieldValue: "Doe" },
    { fieldName: "Street (Mailing address)", fieldValue: "123 Main Street" },
    { fieldName: "CityTown (Mailing address)", fieldValue: "Cityville" },
    { fieldName: "Postal Code (Mailing address)", fieldValue: "12345" },
    { fieldName: "Email Address of adult submitting form", fieldValue: "john.doe@example.com" },
    { fieldName: "Last name of adult submitting form", fieldValue: "Doe" },
    { fieldName: "First Name of adult submitting form", fieldValue: "John" },
    { fieldName: "Apartment No. (Mailing address)", fieldValue: "Apt 101" },
    { fieldName: "Date of Birth 1", fieldValue: "19900101" },
    { fieldName: "Notices", fieldValue: "No" },
];

const inputPdfPath = 'form.pdf'; 
const outputPdfPath = 'output.pdf'; 

fillPdfForm(fieldsData, inputPdfPath, outputPdfPath);
