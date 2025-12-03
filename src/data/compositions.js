export const compositions = [
    {
        name: "Mikhail Starun, Designer",
        blocks: [
            {
                id: 'a1',
                row: 1,
                col: 1,
                rowSpan: 2,
                colSpan: 1,
                color: '#ffffff',
                content: `Art does not reproduce the visible; it makes visible.`,
                contentStyle: {
                    fontSize: 'clamp(18px, 4vmin, 66px)',
                    fontWeight: '600',
                    lineHeight: '1.1',
                    fontStyle: 'italic'
                }
            },
            {
                id: 'a2',
                row: 1,
                col: 2,
                rowSpan: 1,
                colSpan: 2,
                color: '#D40920',
                content: `Mikhail Starun is a visual designer passionate about motion graphics, digital art, and modern web aesthetics. He focuses on creating clean, dynamic visuals for social media, websites, and multimedia projects. Inspired by minimalism, technology, and music, Mikhail strives to build designs that are both functional and emotionally engaging. Based in Saint Petersburg, he continues to explore motion design, UI/UX, and creative storytelling through digital media.`,
                contentStyle: {
                    fontSize: 'clamp(16px, 1.4vmin, 24px)',
                    fontWeight: '400',
                    lineHeight: '1.4',
                    textAlign: 'left'
                }
            },
            {
                id: 'a3',
                row: 2,
                col: 2,
                rowSpan: 1,
                colSpan: 1,
                color: '#1356A2',
                image: 'me_01.JPG'
            },
            {
                id: 'a4',
                row: 2,
                col: 3,
                rowSpan: 1,
                colSpan: 1,
                color: '#F7D842',
                content: `Minimalism • Motion • Design`,
                contentStyle: {
                    fontSize: 'clamp(28px, 4vmin, 22px)',
                    fontWeight: '500',
                    lineHeight: '1.2',
                    textAlign: 'center'
                }
            },
            {
                id: 'a5',
                row: 3,
                col: 1,
                rowSpan: 1,
                colSpan: 3,
                color: '#ffffff',
                video: 'Principal Aberration_02.mp4',
                content: `Explore my work ↓`,
                contentStyle: {
                    fontSize: 'clamp(16px, 1.4vmin, 24px)',
                    fontWeight: '400',
                    lineHeight: '1.4',
                    textAlign: 'left'
                }
            },
        ]
    },
    {
        name: "Composition with Large Red Plane",
        blocks: [
            { id: 'b1', row: 1, col: 1, rowSpan: 2, colSpan: 2, color: '#D40920', video: 'TDMovieOut.0.mp4', },
            {
                id: 'b2',
                row: 1,
                col: 3,
                rowSpan: 1,
                colSpan: 1,
                color: '#1356A2',
                content: 'Creative Toolkit: <strong>TouchDesigner</strong>',
                contentStyle: {
                    color: 'hsla(0, 0%, 100%, 1.00)',
                    fontSize: 'clamp(14px, 3vmin, 66px)',
                    fontWeight: '400',
                    lineHeight: '1.4',
                    textAlign: 'left'
                }
            },
            { id: 'b3', row: 2, col: 3, rowSpan: 1, colSpan: 1, color: '#ffffff' },
            { id: 'b4', row: 3, col: 1, rowSpan: 1, colSpan: 1, color: '#F7D842' },
            {
                id: 'b5',
                row: 3,
                col: 2,
                rowSpan: 1,
                colSpan: 2,
                color: '#ffffff',
                content: 'I primarily work with TouchDesigner, a node- based platform for real - time visual programming.TouchDesigner is an essential tool in my creative process, allowing me to build dynamic, complex visuals and interactive systems.Its strength lies in its real- time capabilities and procedural workflow, which provides immense flexibility for experimentation and rapid prototyping.I enjoy using it to translate simple concepts and data streams (often sourced from tutorials and online learning) into compelling visual outputs, focusing on generative art, motion graphics, and live media exploration.The platform inspires me with its ability to quickly connect different ideas into a final, engaging piece.',
                contentStyle: {
                    color: 'rgba(0, 0, 0, 1)',
                    fontSize: 'clamp(16px, 1.4vmin, 24px)',
                    fontWeight: '400',
                    lineHeight: '1.4',
                    textAlign: 'left'
                }
            },
        ]
    },
    {
        name: "Broadway Boogie Woogie Inspired",
        blocks: [
            { id: 'c1', row: 1, col: 1, rowSpan: 1, colSpan: 1, color: '#F7D842', image: 'me_02.JPG' },
            { id: 'c2', row: 1, col: 2, rowSpan: 1, colSpan: 1, color: '#D40920', image: 'me_08.JPG' },
            { id: 'c3', row: 1, col: 3, rowSpan: 1, colSpan: 1, color: '#1356A2', image: 'me_10.JPG' },
            {
                id: 'c4',
                row: 2,
                col: 1,
                rowSpan: 1,
                colSpan: 1,
                color: '#1356A2',
                content: '<strong>My Approach to Photography.</strong><br /><br />Beyond generative art, photography serves as a vital anchor in my creative process.',
                contentStyle: {
                    color: 'rgba(0, 0, 0, 1)',
                    fontSize: 'clamp(16px, 1.4vmin, 24px)',
                    fontWeight: '400',
                    lineHeight: '1.4',
                    textAlign: 'left'
                }
            },
            { id: 'c5', row: 2, col: 2, rowSpan: 1, colSpan: 1, color: '#ffffff', image: 'me_03.JPG' },
            { id: 'c6', row: 2, col: 3, rowSpan: 1, colSpan: 1, color: '#F7D842', image: 'me_04.JPG' },
            { id: 'c7', row: 3, col: 1, rowSpan: 1, colSpan: 1, color: '#D40920', image: 'me_05.JPG' },
            { id: 'c8', row: 3, col: 2, rowSpan: 1, colSpan: 1, color: '#F7D842', image: 'me_06.JPG' },
            { id: 'c9', row: 3, col: 3, rowSpan: 1, colSpan: 1, color: '#ffffff', image: 'me_07.JPG' }
        ]
    },
    {
        name: "Composition with Yellow",
        blocks: [
            { id: 'd1', row: 1, col: 1, rowSpan: 1, colSpan: 2, color: '#ffffff', video: 'Tricky_01.mp4' },
            { id: 'd2', row: 1, col: 3, rowSpan: 2, colSpan: 1, color: '#F7D842', video: 'Zamboanguita_01.mp4' },
            {
                id: 'd3', row: 2, col: 1, rowSpan: 2, colSpan: 1, color: '#D40920',
                content: `<strong style="font-size: 1.6em;">Camera in hand</strong><br/><br/>Shooting digital, embracing grain. Cutting in Premiere, grading in Resolve. The complete video workflow, start to finish.`,
                contentStyle: {
                    color: 'hsla(0, 0%, 100%, 1.00)',
                    fontSize: 'clamp(16px, 1.6vmin, 56px)',
                    fontWeight: '400',
                    lineHeight: '1.6',
                    textAlign: 'left',
                    padding: 'clamp(20px, 4vmin, 40px)',
                    boxSizing: 'border-box'
                }
            },
            { id: 'd4', row: 2, col: 2, rowSpan: 1, colSpan: 1, color: '#ffffff' },
            { id: 'd5', row: 3, col: 2, rowSpan: 1, colSpan: 2, color: '#1356A2', video: 'Tricky.mp4' }
        ]
    },
    {
        name: "Composition No. III",
        blocks: [
            { id: 'e1', row: 1, col: 1, rowSpan: 2, colSpan: 1, color: '#1356A2', video: 'Valentine`s day_01.mp4' },
            { id: 'e2', row: 1, col: 2, rowSpan: 1, colSpan: 2, color: '#ffffff', video: 'Showreal.mp4' },
            { id: 'e3', row: 2, col: 2, rowSpan: 1, colSpan: 1, color: '#D40920', video: 'Balls_01.mp4' },
            {
                id: 'e4', row: 2, col: 3, rowSpan: 2, colSpan: 1, color: '#F7D842',
                content: `<strong style="font-size: 1.6em; display: block; margin-bottom: 12px;">Making things move since it seemed easier than therapy</strong><br/>Because static is boring. Animating everything from logos to existential crises. If it doesn't wiggle, why bother?`,
                contentStyle: {
                    color: 'hsla(0, 0%, 100%, 0.90)',
                    fontSize: 'clamp(22px, 1.2vmin, 20px)',
                    fontWeight: '400',
                    lineHeight: '1.5',
                    textAlign: 'left',
                    padding: 'clamp(20px, 3vmin, 30px)',
                    boxSizing: 'border-box'
                }
            },
            { id: 'e5', row: 3, col: 1, rowSpan: 1, colSpan: 2, color: '#ffffff', video: 'Coding for Motion Design.mp4' }
        ]
    },
    {
        name: "Tableau I",
        blocks: [
            { id: 'f1', row: 1, col: 1, rowSpan: 1, colSpan: 1, color: '#ffffff', image: 'Art_4_03.png' },
            { id: 'f2', row: 1, col: 2, rowSpan: 2, colSpan: 2, color: '#D40920', image: 'Rambo_02.jpg' },
            { id: 'f3', row: 2, col: 1, rowSpan: 2, colSpan: 1, color: '#F7D842', image: 'Flyer_Out_18.png' },
            { id: 'f4', row: 3, col: 2, rowSpan: 1, colSpan: 1, color: '#1356A2', image: 'Round_12_01.svg' },
            {
                id: 'f5', row: 3, col: 3, rowSpan: 1, colSpan: 1, color: '#ffffff',
                content: `<strong style="font-size: 1.6em; display: block; margin-bottom: 12px;">Less, but better</strong><br/>Clean layouts, intentional typography. Graphic design as problem-solving through aesthetics.`,
                contentStyle: {
                    color: 'hsla(0, 0%, 100%, 0.90)',
                    fontSize: 'clamp(20px, 1.4vmin, 20px)',
                    fontWeight: '400',
                    lineHeight: '1.1',
                    textAlign: 'left',
                    padding: 'clamp(14px, 2vmin, 14px)',
                    boxSizing: 'border-box'
                }
            },
        ]
    },
    {
        name: "Victory Boogie Woogie Inspired",
        blocks: [
            {
                id: 'g1',
                row: 1,
                col: 1,
                rowSpan: 1,
                colSpan: 2,
                color: '#F7D842',
                content: `<div style="
            width: 100%;
            height: 100%;
            overflow: hidden;
            position: relative;
            background: #000000;
            border: 4px solid #000000;
          ">
            <iframe 
              src="/Ex_09102025.html"
              style="
                width: 200%;
                height: 200%;
                border: none;
                background: transparent;
                display: block;
                transform: scale(0.5);
                transform-origin: 0 0;
              "
              title="3D Particles"
              scrolling="no"
              frameborder="0"
              allowtransparency="true"
              loading="eager"
            ></iframe>
          </div>`
            },
            { id: 'g2', row: 1, col: 3, rowSpan: 1, colSpan: 1, color: '#D40920', video: 'Generative Design- Algorithms_01.mp4' },
            { id: 'g3', row: 2, col: 1, rowSpan: 1, colSpan: 1, color: '#1356A2', video: 'Triangles_02.mp4' },
            {
                id: 'g4',
                row: 2,
                col: 2,
                rowSpan: 1,
                colSpan: 2,
                color: '#F7D842',
                content: `<div style="
            padding: clamp(40px, 4vmin, 60px);
            width: 100%;
            height: 100%;
            display: flex;
            flex-direction: column;
            justify-content: center;
          ">
            <strong style="
              font-size: 4em;
              display: block;
              margin-bottom: 1em;
              letter-spacing: 0.5px;
              color: rgba(0, 0, 0, 0.9);
            ">
              Code as creative medium
            </strong>
            <div style="
              font-size: 2em;
              line-height: 1.1;
              color: rgba(0, 0, 0, 0.8);
              font-weight: 400;
            ">
              The beauty is just well-organized data.
            </div>
          </div>`,
                contentStyle: {
                    width: '100%',
                    height: '100%',
                    boxSizing: 'border-box'
                }
            },
            { id: 'g5', row: 3, col: 1, rowSpan: 1, colSpan: 1, color: '#D40920' },
            { id: 'g6', row: 3, col: 2, rowSpan: 1, colSpan: 1, color: '#ffffff' },
            { id: 'g7', row: 3, col: 3, rowSpan: 1, colSpan: 1, color: '#1356A2' }
        ]
    }
];