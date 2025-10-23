import { Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType } from 'docx';

export const downloadWord = async (cvData, fileName = 'CV') => {
  try {
    const { personalInfo, experiences, educationList, skills } = cvData;

    // Create document sections
    const sections = [
      // Header with personal info
      {
        properties: {},
        children: [
          new Paragraph({
            children: [
              new TextRun({
                text: personalInfo.fullName || 'Your Name',
                bold: true,
                size: 32,
              }),
            ],
            alignment: AlignmentType.CENTER,
            spacing: { after: 400 },
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: [personalInfo.email, personalInfo.phone, personalInfo.location]
                  .filter(Boolean)
                  .join(' | '),
                size: 22,
              }),
            ],
            alignment: AlignmentType.CENTER,
            spacing: { after: 600 },
          }),
        ],
      },

      // Professional Summary
      ...(personalInfo.summary ? [
        {
          properties: {},
          children: [
            new Paragraph({
              text: "Professional Summary",
              heading: HeadingLevel.HEADING_2,
              spacing: { after: 200 },
            }),
            new Paragraph({
              text: personalInfo.summary,
              spacing: { after: 400 },
            }),
          ],
        }
      ] : []),

      // Experience
      ...(experiences.length > 0 ? [
        {
          properties: {},
          children: [
            new Paragraph({
              text: "Professional Experience",
              heading: HeadingLevel.HEADING_2,
              spacing: { after: 200 },
            }),
            ...experiences.flatMap(exp => [
              new Paragraph({
                children: [
                  new TextRun({
                    text: exp.jobTitle || 'Position',
                    bold: true,
                    size: 24,
                  }),
                ],
                spacing: { after: 100 },
              }),
              new Paragraph({
                children: [
                  new TextRun({
                    text: `${exp.company || 'Company'}${exp.location ? ` | ${exp.location}` : ''}`,
                    italics: true,
                    size: 20,
                  }),
                ],
                spacing: { after: 100 },
              }),
              new Paragraph({
                children: [
                  new TextRun({
                    text: `${exp.startDate || 'Start'} - ${exp.endDate || 'Present'}`,
                    size: 18,
                  }),
                ],
                spacing: { after: 200 },
              }),
              ...(exp.description ? [
                new Paragraph({
                  text: exp.description,
                  spacing: { after: 400 },
                })
              ] : [new Paragraph({ text: '', spacing: { after: 400 } })])
            ]),
          ],
        }
      ] : []),

      // Education
      ...(educationList.length > 0 ? [
        {
          properties: {},
          children: [
            new Paragraph({
              text: "Education",
              heading: HeadingLevel.HEADING_2,
              spacing: { after: 200 },
            }),
            ...educationList.flatMap(edu => [
              new Paragraph({
                children: [
                  new TextRun({
                    text: edu.degree || 'Degree',
                    bold: true,
                    size: 24,
                  }),
                ],
                spacing: { after: 100 },
              }),
              new Paragraph({
                children: [
                  new TextRun({
                    text: `${edu.institution || 'Institution'}${edu.location ? ` | ${edu.location}` : ''}`,
                    italics: true,
                    size: 20,
                  }),
                ],
                spacing: { after: 100 },
              }),
              new Paragraph({
                children: [
                  new TextRun({
                    text: `${edu.startDate || 'Start'} - ${edu.endDate || 'Graduation'}`,
                    size: 18,
                  }),
                ],
                spacing: { after: 400 },
              }),
            ]),
          ],
        }
      ] : []),

      // Skills
      ...(skills.length > 0 ? [
        {
          properties: {},
          children: [
            new Paragraph({
              text: "Skills",
              heading: HeadingLevel.HEADING_2,
              spacing: { after: 200 },
            }),
            new Paragraph({
              text: skills.join(' • '),
              spacing: { after: 400 },
            }),
          ],
        }
      ] : []),
    ];

    const doc = new Document({
      sections: sections.filter(section => section.children.length > 0),
    });

    // Generate and download the document
    const blob = await Packer.toBlob(doc);
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${fileName.replace(/\s+/g, '_')}.docx`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

  } catch (error) {
    console.error('Error generating Word document:', error);
    throw error;
  }
};