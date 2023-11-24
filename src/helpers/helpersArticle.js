import { formatDistanceToNow, differenceInDays } from 'date-fns';

export const getAuthorName = (author) => author?.username || 'Unknown author';

export const getFormattedDate = (dateString) => {
  if (!dateString) {
    return 'Unknown date';
  }

  const date = new Date(dateString);
  const now = new Date();

  if (differenceInDays(now, date) > 3) {
    const screenWidth = window.innerWidth;

    if (screenWidth <= 425) {
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      });
    }
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  }

  return formatDistanceToNow(date, { addSuffix: true });
};
export const getImageSrc = (author, defaultImage) =>
  author?.image?.includes('http') ? author.image : defaultImage;

export const getShortString = (str, maxLength) => {
  if (str.length <= maxLength) {
    return str;
  }

  const words = str.split(' ');

  if (words.length === 1) {
    return `${str.substring(0, maxLength - 2)}…`;
  }

  const result = words.reduce((acc, word) => {
    if ((acc + word).length <= maxLength) {
      return `${acc + word} `;
    }
    return acc;
  }, '');

  return result.trimEnd().endsWith('…')
    ? result.trimEnd()
    : `${result.trimEnd()}…`;
};
