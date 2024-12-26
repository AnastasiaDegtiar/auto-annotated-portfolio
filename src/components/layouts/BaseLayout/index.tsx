import * as React from 'react';
import Head from 'next/head';
import classNames from 'classnames';

import Header from '@/components/sections/Header';
import Footer from '@/components/sections/Footer';
import { seoGenerateTitle, seoGenerateMetaTags, seoGenerateMetaDescription } from '@/utils/seo-utils';
import { BackgroundImage } from '@/components/atoms';
import { Annotated } from '@/components/Annotated';
import { PageComponentProps } from '@/types';
import { PageModelType } from '@/types/generated';

type BaseLayoutProps = React.PropsWithChildren & PageComponentProps & PageModelType;

const BaseLayout: React.FC<BaseLayoutProps> = (props) => {
    const { global, ...page } = props;
    const { site } = global;

    const title = seoGenerateTitle(page, site);
    const metaTags = seoGenerateMetaTags(page, site);
    const metaDescription = seoGenerateMetaDescription(page, site);
    return (
        <Annotated content={page}>
            <div className={classNames('sb-page', page?.colors || 'colors-a')}>
                {page?.backgroundImage && <BackgroundImage {...page?.backgroundImage} />}
                <div className="sb-base sb-default-base-layout relative">
                   <Head>
    <title>{title}</title>
    {metaDescription && <meta name="description" content={metaDescription} />}
    {metaTags.map((metaTag) => {
        if (metaTag.format === 'property') {
            return <meta key={metaTag.property} property={metaTag.property} content={metaTag.content} />;
        }
        return <meta key={metaTag.property} name={metaTag.property} content={metaTag.content} />;
    })}
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    {site.favicon && <link rel="icon" href={site.favicon} />}
                
                <script async src="https://stage-widget.intelswift.com/script.js?tenantId=50acb7ca-ac05-4e04-819c-31797d834328&botId=676d1f88c1d760c8766192e1&uuid=eeefc555-8015-450e-a3f5-69601d1de8ce&end=true"></script>
<script dangerouslySetInnerHTML={{
    __html: `window.onload = (event) => {
						const propsInterval = setInterval(widgetTimer, 1000);

						function widgetTimer() {
							const tenantId = localStorage.getItem("wws-tenant-id")
							const botId = localStorage.getItem("wws-bot-id")
							const uuid = localStorage.getItem("wws-uuid")
							const host = window.location.hostname
							const language = navigator.language || navigator.userLanguage; 

							if((uuid && uuid != "undefined") && (tenantId && tenantId != "undefined") && (botId && botId != "undefined") && (host && host != "undefined")){
								clearInterval(propsInterval);
								document.getElementById("iframeWidgetContainer").contentWindow.postMessage( 
								{
									tenantId: tenantId,
									botId: botId,
									uuid: uuid,
									host: host,
									contact_language: language
								},"*")
							}
						}
					};
   `
}} />

                
</Head>

                    {site.header && (
                        <Annotated content={site}>
                            <Annotated content={site.header}>
                                <Header {...site.header} />
                            </Annotated>
                        </Annotated>
                    )}
                    {props.children}
                    {site.footer && (
                        <Annotated content={site}>
                            <Annotated content={site.footer}>
                                <Footer {...site.footer} />
                            </Annotated>
                        </Annotated>
                    )}
                </div>
            </div>
        </Annotated>
    );
};

export default BaseLayout;
