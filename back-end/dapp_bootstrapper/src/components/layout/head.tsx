import React from 'react';
import ReactDOM from 'react-dom';

interface IProperties {
  title: string;
  description?: string;
  keywords?: string;
}

const headRoot = document.head;

export default function Head({ title, description, keywords }: IProperties) {
  return ReactDOM.createPortal(
    <MetaHead title={title} description={description} keywords={keywords} />,
    headRoot
  );
}

function MetaHead({ title, description, keywords }: IProperties) {
  return (
    <>
      <meta charSet='utf-8' />
      <meta httpEquiv='x-ua-compatible' content='ie=edge' />
      <meta name='viewport' content='width=device-width, initial-scale=1' />

      <title>{title}</title>
      <meta name='title' content={title} />
      <meta name='application-name' content={title} />
      <meta name='description' content={description} />
      <meta name='keywords' content={keywords} />
      <link rel='manifest' href='/app.webmanifest' />
      <link rel='icon' sizes='192x192' href='/favicon/favicon-192.webp' />
      <link rel='icon' sizes='512x512' href='/favicon/favicon-512.webp' />

      <meta name='rating' content='General' />
      <meta name='robots' content='noindex, nofollow' />

      <link rel='apple-touch-icon' href='/favicon/favicon-512.webp' />
      <link rel='mask-icon' href='/favicon/favicon-512.webp' color='black' />
      <meta name='apple-mobile-web-app-title' content={title} />
      <meta name='apple-mobile-web-app-capable' content='yes' />
      <meta name='apple-mobile-web-app-status-bar-style' content='black' />
    </>
  );
}
