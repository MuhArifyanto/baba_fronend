import React, { useRef, useEffect } from 'react';

type CaptchaCanvasProps = {
  text: string;
};

function CaptchaCanvas({ text }: CaptchaCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const drawCaptcha = (text: string) => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        canvas.width = 120;
        canvas.height = 60;
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        for (let i = 0; i < canvas.width; i++) {
          for (let j = 0; j < canvas.height; j++) {
            const gray = Math.floor(Math.random() * 255);
            ctx.fillStyle = `rgba(${gray}, ${gray}, ${gray}, 0.95)`;
            ctx.fillRect(i, j, 1, 1);
          }
        }

        ctx.filter = 'blur(10000px)';
        ctx.fillStyle = '#e0e0e0';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.filter = 'none';
        ctx.font = '26px Arial';
        ctx.fillStyle = '#000';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';

        const xStart = canvas.width / (text.length + 1);
        const y = canvas.height / 2;

        for (let i = 0; i < text.length; i++) {
          const char = text[i];
          const x = (i + 1) * xStart;

          ctx.save();
          ctx.translate(x, y);

          const randomAngle = Math.random() * 0.4 - 0.2;
          ctx.rotate(randomAngle);

          const randomScale = 1 + Math.random() * 0.2;
          ctx.scale(randomScale, randomScale);

          ctx.fillText(char, 0, 0);
          ctx.restore();
        }
      }
    }
  };

  // Menggambar CAPTCHA setiap kali teks berubah
  useEffect(() => {
    drawCaptcha(text);
  }, [text]);

  return (
    <canvas
      ref={canvasRef}
      style={{ display: 'block', border: '1px solid #ccc' }}
    />
  );
}

export default CaptchaCanvas;
