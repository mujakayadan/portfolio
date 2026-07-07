export interface ContactMailtoFields {
  visitorName: string;
  visitorEmail: string;
  message: string;
}

export const buildContactMailtoUrl = (ownerEmail: string, fields: ContactMailtoFields): string => {
  const subject = encodeURIComponent(`Portfolio contact from ${fields.visitorName}`);
  const body = encodeURIComponent(
    `Name: ${fields.visitorName}\nEmail: ${fields.visitorEmail}\n\nMessage:\n${fields.message}`
  );

  return `mailto:${ownerEmail}?subject=${subject}&body=${body}`;
};
