import { Render, World, Composites, Bodies, Common, Mouse, MouseConstraint, Bounds, Events } from 'matter-js'
import { DIFFICULTIES } from './constants'

export const createRenderer = (scene, engine) => {
    const cw = window.innerWidth
    const ch = window.innerHeight

    return Render.create({
        element: scene.current,
        engine: engine.current,
        options: {
            width: cw,
            height: ch,
            wireframes: false,
            background: '#000000'
        }
    });
}

export const addBorders = (engine) => {
    const cw = window.innerWidth;
    const ch = window.innerHeight;

    World.add(engine.current.world, [
        Bodies.rectangle(cw / 2, -10, cw, 20, { isStatic: true }),
        Bodies.rectangle(-10, ch / 2, 20, ch, { isStatic: true }),
        Bodies.rectangle(cw / 2, ch + 10, cw, 20, { isStatic: true }),
        Bodies.rectangle(cw + 10, ch / 2, 20, ch, { isStatic: true })
    ])
}

export const addBodies = (engine, render, diff) => {
    if (diff > DIFFICULTIES.length - 1) {
        diff = DIFFICULTIES.length - 1;
    }
    console.log("difficulty: ", diff)

    const stack = Composites.stack(0, 0, DIFFICULTIES[diff] / 2, DIFFICULTIES[diff] / 2, 0, 0, function (x, y) {
        const randomX = Common.random(0, render.current.options.width);
        const scale = Common.random(0.09, 0.2);

        return Bodies.circle(randomX, y, scale * 120, {
            render: {
                mass: 2,
                restitution: 0.5,
                friction: 0.005,
                sprite: {
                    texture: '/logo/mushroom_orange.png',
                    xScale: scale,
                    yScale: scale,
                }
            }
        });
    });

    World.add(engine.current.world, stack);
}

export const addMushroom = (engine, render) => {
    const randomX = Common.random(0, render.current.options.width);
    const scale = Common.random(0.09, 0.2);

    const mushroom = Bodies.circle(randomX, 4, scale * 100, {
        render: {
            mass: 2,
            restitution: 0.5,
            friction: 0.005,
            sprite: {
                texture: '/logo/mushroom_orange.png',
                xScale: scale,
                yScale: scale,
            }
        },
    });

    World.add(engine.current.world, mushroom);

    return mushroom;
}

export const setupMouseControl = (engine, render) => {
    var mouse = Mouse.create(render.current.canvas);
    var mouseConstraint = MouseConstraint.create(engine.current, {
        mouse: mouse,
        constraint: {
            stiffness: 0.1,
            render: {
                visible: false
            }
        }
    });

    World.add(engine.current.world, mouseConstraint);

    // keep the mouse in sync with rendering
    render.current.mouse = mouse;

    return mouseConstraint;
}

export const setUpMouseEvents = (mouseConstraint, mushroom, setFound, setRunGame) => {
    Events.on(mouseConstraint, 'mousedown', (event) => {
        const mousePosition = event.mouse.position;
        if (Bounds.contains(mushroom.bounds, mousePosition)) {
            mushroom.render.sprite.texture = '/logo/mushroom_green.png';
            setFound(true);
            setRunGame(false);
        }
    });
}