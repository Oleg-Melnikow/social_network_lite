import React, {ComponentType, Suspense} from "react";
import {Preloader} from "../components/common/Preloader/Preloader";


export function withSuspense(Component: ComponentType) {
    return <Suspense fallback={<Preloader/>}>
            <Component/>
        </Suspense>
}