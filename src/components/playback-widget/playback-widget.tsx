import {useWebPlayer} from "@/contexts/SpotifyWebPlayer";
import {useEffect} from "react";
import colors from "tailwindcss/colors";
import {PlayCircleIcon, PauseCircleIcon, ForwardIcon, BackwardIcon} from "@heroicons/react/24/outline";

export const PlaybackWidget = () => {
    const {currentTrack, player, isPaused, isActive, stopTrack, startTrack, forward, backward} = useWebPlayer();
    useEffect(() => {
        console.log(isActive)
    }, [isActive]);
    return (
        (player && currentTrack) && (<>
            <div className="fixed w-full bottom-20 mr-auto ml-auto flex-col flex items-center justify-center h-16">
                <div className='w-72 bg-gray-400 bg-opacity-90 rounded-md h-full overflow-x-hidden overflow-y-hidden'>
                    <div className="flex items-center justify-center h-1/2 text-nowrap">
                    <span className='text-white'><strong>{
                        currentTrack?.name
                    } </strong> -
                        {currentTrack?.artists[0].name
                        }</span>

                    </div>
                    <div className="flex items-center justify-center h-1/2 pb-2">

                        <button className="btn-spotify" onClick={() => {
                            backward();
                        }}>
                            <BackwardIcon height={24} width={24} color={colors.sky["600"]} className='fill-sky-600'/>
                        </button>

                        <button className="btn-spotify ml-5 mr-5" onClick={() => {
                            if (isPaused) startTrack(undefined, currentTrack ? [currentTrack.uri] : undefined);
                            else stopTrack();
                        }}>
                            {isPaused ? (<PlayCircleIcon height={32} width={32} color={colors.sky["600"]}/>) :
                                <PauseCircleIcon height={32} width={32} color={colors.sky["600"]}/>}
                        </button>

                        <button className="btn-spotify" onClick={() => {
                            forward()
                        }}>
                            <ForwardIcon height={24} width={24} color={colors.sky["600"]} className='fill-sky-600'/>
                        </button>
                    </div>
                </div>
            </div>
        </>)
    )
}