import { useEffect } from "react";
import { useRecoilSnapshot } from "recoil";

// faz o log de todas as modificações que ocorrerem em um átomo
export default function DebugObserver() {
    const snapshot = useRecoilSnapshot();
    useEffect(() => {
        console.debug('The following atoms were modified:');
        for (const node of snapshot.getNodes_UNSTABLE({ isModified: true })) {
            console.debug(node.key, snapshot.getLoadable(node));
        }
    }, [snapshot]);

    return null;
}