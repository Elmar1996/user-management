import { forwardRef, ReactNode } from 'react';
import { Helmet } from 'react-helmet';
import { styled } from '@mui/styles';

type PageProps = {
    children: ReactNode;
    title?: string;
    className?: string;
    style?: React.CSSProperties;
};

const Root = styled('div')(() => ({
    minHeight: '100%',
}));

const Page = forwardRef<HTMLDivElement, PageProps>(({ children, title = '', ...props }, ref) => {
    const pageTitle = title ? `${title}` : 'Falkon';

    return (
        <Root ref={ref} {...props}>
            <Helmet>
                <title>{pageTitle}</title>
            </Helmet>
            {children}
        </Root>
    );
});

Page.displayName = 'Page';

export { Page };
