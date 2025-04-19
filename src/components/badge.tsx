import {CheckCircleIcon} from "@heroicons/react/24/outline";
import colors from "tailwindcss/colors";
import {useSavedTracks} from "@/contexts/SavedTracks";

export const Badge = () => {
    const {showSuccessBadge} = useSavedTracks();
    return showSuccessBadge && (
        <div id="toast-success"
             className="flex items-center w-full max-w-xs p-4 mb-4 text-gray-500 bg-white rounded-lg shadow-sm dark:text-gray-400 fixed z-50"
             role="alert">
            <div
                className="inline-flex items-center justify-center shrink-0 w-8 h-8 text-green-500  rounded-lg dark:text-green-200">
                <CheckCircleIcon color={colors.green["400"]} height={32} width={32}/>
            </div>
            <div className="ms-3 text-sm font-normal">Title added to collection successfully!</div>
        </div>
    );
}