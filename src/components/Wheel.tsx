import { useCallback, useEffect, useRef } from "react";



const data = [
    { name: 'firstPrize', color: 'yellow', value: 0.3 },
    { name: 'secendPrize', color: 'red', value: 0.2 },
    { name: 'thirdPrize', color: 'green', value: 0.1 },
    { name: 'fourthPrize', color: 'purple', value: 0.15 },
    { name: 'fifthPrize', color: 'blue', value: 0.25 }
];
export default function Wheel()
{
    const canvas = useRef<HTMLCanvasElement>(null);


    const drawCircle = useCallback(() =>
    {
        const canvasEl = canvas.current as HTMLCanvasElement;

        const ctx = canvasEl.getContext('2d');

        //Center of the circle
        const x0 = canvasEl.width * 0.5;
        const y0 = canvasEl.height * 0.5;

        const radius = 150;

        let beginAngle = -90 * Math.PI / 180;

        for (const i of data)
        {
            const area = i.value * 360 * Math.PI / 180;

            const endAngle = beginAngle + area;

            ctx?.beginPath();

            ctx?.moveTo(x0, y0);

            ctx?.arc(x0, y0, radius, beginAngle, endAngle);

            ctx!.fillStyle = i.color;

            ctx?.fill();

            beginAngle = endAngle;
        }
    }, []);

    useEffect(() =>
    {
        drawCircle();
    }, []);

    return (
        <div>
            <canvas ref={canvas} width='300' height='300'>
                <p>Current Price: 25.51</p>
            </canvas>
        </div>
    );
}
