import QRCode from 'qrcode';

export function generateQrcode(canvas : HTMLCanvasElement, id : string) {
  QRCode.toCanvas(canvas,`${window.location.origin}/phone-client/${id}`, (error) => {
    if (error) console.error(error);
    console.log('success!');
  });
}

export function getCookie(name: string) {
  const value = `; ${document.cookie}`;
  const parts: string[] = value.split(`; ${name}=`);
  if (parts.length === 2){
    const str: string = parts.pop() as string;
    return str.split(';').shift();
  }
}
