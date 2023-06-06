export const exportSVG = (editor) => {
  const svgString = editor.canvas.toSVG();

  const fixedSVGString = svgString.replace(/&(?!\w+;)/g, '&amp;');

  const blob = new Blob([fixedSVGString], { type: 'image/svg+xml' });
  const url = URL.createObjectURL(blob);

  const link = document.createElement('a');
  link.href = url;
  link.download = 'canvas.svg';
  link.click();

  URL.revokeObjectURL(url);
};