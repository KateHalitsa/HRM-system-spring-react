import React from 'react';
import {
    useLocation,
    useNavigate,
    useParams,
    useSearchParams,
} from 'react-router-dom';

// See https://whereisthemouse.com/how-to-use-withrouter-hoc-in-react-router-v6-with-typescript

/** @deprecated Use `React Router hooks` instead */
export interface WithRouterProps {
    location: ReturnType<typeof useLocation>;
    params: Record<string, string>;
    navigate: ReturnType<typeof useNavigate>;
    searchParams: ReturnType<typeof useSearchParams>;
}

/** @deprecated Use `React Router hooks` instead */
export const withRouter = <Props extends WithRouterProps>(
    Component: React.ComponentType<Props>
) => {
    return (props: Omit<Props, keyof WithRouterProps>) => {
        const location = useLocation();
        const params = useParams();
        const navigate = useNavigate();
        const searchParams = useSearchParams();

        return (
            <Component
                {...(props as Props)}
                location={location}
                params={params}
                navigate={navigate}
                searchParams = {searchParams}
            />
        );
    };
};