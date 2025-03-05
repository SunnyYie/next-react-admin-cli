import { Suspense, lazy } from "react";
import { AppRouteObject } from "../types";
import { Outlet } from "react-router";

import { CircleLoading } from "../../components/circle-loading";

const Page403 = lazy(() => import('../../pages/errors/Page403'));
const Page404 = lazy(() => import('../../pages/errors/Page404'));
const Page500 = lazy(() => import('../../pages/errors/Page500'));

export const ErrorRoutes: AppRouteObject = {
    element: (
        <Suspense fallback={<CircleLoading />}>
            <Outlet />
        </Suspense>
    ),
    children: [
        { path: '403', element: <Page403 /> },
        { path: '404', element: <Page404 /> },
        { path: '500', element: <Page500 /> },
    ]
}