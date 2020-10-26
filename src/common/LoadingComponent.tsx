import React from 'react';
import './LoadingComponent.css';

export class Loading extends React.Component<any, any> {

    private readonly canvas: React.RefObject<HTMLCanvasElement>;

    constructor(props: any) {
        super(props);
        this.canvas = React.createRef<HTMLCanvasElement>();
    }


    componentDidMount() {
        const canvas = this.canvas.current as HTMLCanvasElement;
        const context = canvas.getContext('2d') as CanvasRenderingContext2D;
        const radius = 8;
        const BigR = 40;
        for (let i = 1; i < 10; i++) {
            this.drawCircle(context,
                80 + BigR * Math.cos(i * Math.PI / 5),
                80 + BigR * Math.sin(i * Math.PI / 5),
                radius,
                0.1 * i);
        }
    }

    drawCircle = (context: CanvasRenderingContext2D, x: number, y: number, r: number, opacity: number) => {
        context.fillStyle = 'rgba(0, 0, 0, ' + opacity + ')';
        context.beginPath();
        context.arc(x, y, r, 0, Math.PI * 2);
        context.fill();
        context.closePath();
    };


    render() {
        return (
            <div className="LoadingContainer FullPage">
                <canvas className="LoadingSpin" ref={this.canvas}
                        width='160'
                        height='160'/>
                <div>Loading. Please Wait...</div>
            </div>
        );
    }
}