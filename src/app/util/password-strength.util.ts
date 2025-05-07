export function getPasswordStrength(password: string): { score: number; label: string; color: string } {
  let score = 0;
  if (password.length >= 8) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[a-z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[\W_]/.test(password)) score++;

  let label = 'Sehr schwach';
  let color = 'red';

  switch (score) {
    case 1:
    case 2:
      label = 'Schwach';
      color = 'orangered';
      break;
    case 3:
      label = 'Mittel';
      color = 'orange';
      break;
    case 4:
      label = 'Stark';
      color = 'yellowgreen';
      break;
    case 5:
      label = 'Sehr stark';
      color = 'green';
      break;
  }

  return { score, label, color };
}
