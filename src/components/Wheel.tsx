import { useCallback, useEffect, useRef, useState } from "react";

import { Easing, Tween, update } from '@tweenjs/tween.js';

const data = [
    { name: 'firstPrize', color: 'yellow', value: 0.3 },
    { name: 'secendPrize', color: 'red', value: 0.2 },
    { name: 'thirdPrize', color: 'green', value: 0.1 },
    { name: 'fourthPrize', color: 'purple', value: 0.15 },
    { name: 'fifthPrize', color: 'blue', value: 0.25 }
];

const params = {
    roatation: 0
};

export default function Wheel()
{
    const canvas = useRef<HTMLCanvasElement>(null);


    const [disable, setDisable] = useState<boolean>(false);


    const drawCircle = useCallback(() =>
    {

        const canvasEl = canvas.current as HTMLCanvasElement;

        const ctx = canvasEl.getContext('2d');

        if (!ctx) return;

        ctx.clearRect(0, 0, canvasEl.width, canvasEl.height);

        //Center of the circle
        const x0 = canvasEl.width * 0.5;
        const y0 = canvasEl.height * 0.5;

        const radius = 150;

        let beginAngle = -90 * Math.PI / 180;

        for (const i of data)
        {
            const area = i.value * 360 * Math.PI / 180;

            const endAngle = beginAngle + area;

            ctx.beginPath();

            ctx.moveTo(x0, y0);

            ctx.arc(x0, y0, radius, beginAngle, endAngle);

            ctx!.fillStyle = i.color;

            ctx.fill();

            //At center
            const textAngle = (beginAngle + endAngle) * 0.5;


            ctx.save();

            ctx.font = "15px '微软雅黑'";

            ctx.textAlign = 'start';

            ctx.textBaseline = 'middle';

            const textWidth = ctx.measureText(i.name).width;

            ctx.translate(x0, y0);

            ctx.rotate(textAngle);

            ctx.fillStyle = 'white';

            ctx.fillText(i.name, textWidth / 2, 0);

            ctx.restore();

            beginAngle = endAngle;
        }
    }, []);


    const rotate = useCallback(() =>
    {
        if (disable) return;

        const random_circle = Math.random() * 10;
        const random_time = Math.random() * 100;


        new Tween(params)
            .to({ roatation: params.roatation + 360 * random_circle })
            .duration(2000 + random_time)
            .onStart(() => { setDisable(true); })
            .onUpdate(v =>
            {
                canvas.current!.style.rotate = `${v.roatation}deg`;
            })
            .easing(Easing.Quadratic.InOut)
            .onComplete(() => { setDisable(false); })
            .start();
    }, [disable]);

    useEffect(() =>
    {
        drawCircle();

        const loop = () =>
        {
            requestAnimationFrame(loop);

            update();
        };

        loop();
    }, [drawCircle]);

    return (
        <div>
            <div className="pointer" style={{
                borderTop: '20px black solid',
                borderRight: '20px transparent solid',
                borderLeft: '20px transparent solid',
                borderBottom: '20px transparent solid',
                position: 'absolute',
                right: "calc(50% - 80px)", top: 20,
                rotate: '35deg', zIndex: 3
            }}>

            </div>

            <canvas ref={canvas} width='300' height='300' style={{ width: 300, height: 300 }}>
                <p>Current Price: 25.51</p>
            </canvas>

            <button children='Start' onClick={rotate} disabled={disable} />
        </div>
    );
}
