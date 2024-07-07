'use client';

import { useRef, useState } from 'react'
import { Engine, Render, World } from 'matter-js'
import { addBodies, addBorders, addMushroom, createRenderer, setupMouseControl, setUpMouseEvents } from './matterSetup';
import GameInfo from './gameInfo';

export default function GamePage() {
    const scene = useRef()
    const engine = useRef(Engine.create())
    const render = useRef(null);

    const [runGame, setRunGame] = useState(false)
    const [found, setFound] = useState(false);
    const [diff, setDiff] = useState(0);

    const renderGame = (difficulty) => {
        try {
            render.current = createRenderer(scene, engine);
            addBorders(engine);
            addBodies(engine, render, difficulty);
            const mushroom = addMushroom(engine, render)
            const mouseConstraint = setupMouseControl(engine, render)
            setUpMouseEvents(mouseConstraint, mushroom, setFound, setRunGame);

            Engine.run(engine.current)
            Render.run(render.current)

            setRunGame(true);
        } catch (err) {
            console.log("error")
            console.log(err)
        }
    }

    const destroyMatter = () => {
        console.log("destroy matter")
        try {
            Render.stop(render.current);
            World.clear(engine.current.world);
            Engine.clear(engine.current);
            render.current.canvas.remove();
            render.current.canvas = null;
            render.current.context = null;
            render.current.mouse = null;
            render.current.textures = {};

            setFound(false)
        } catch (err) {
            console.log(err);
        }
    }

    const startGame = () => {
        console.log("start game")

        if (found) {
            destroyMatter()
            const newDiff = diff + 1;
            setDiff(newDiff);
            renderGame(newDiff)
        } else {
            renderGame(diff);
        }
    }

    return (
        <div
            className="bg-black h-[100vh] flex flex-col items-center text-center"
        >
            <GameInfo runGame={runGame} found={found} startGame={startGame} />
            <div ref={scene} className='w-screen' />
        </div>
    );
}