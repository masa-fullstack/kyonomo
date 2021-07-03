export const shareTargetPicker = async (text: string, url: string) => {
  const liff = (await import('@line/liff')).default
  await liff.ready
  if (liff.isApiAvailable('shareTargetPicker')) {
    await liff.shareTargetPicker([
      {
        type: 'flex',
        altText: 'this is a flex message',
        contents: {
          type: 'bubble',
          // hero: {
          //   type: 'image',
          //   url: 'https://scdn.line-apps.com/n/channel_devcenter/img/fx/01_1_cafe.png',
          //   size: 'full',
          //   aspectRatio: '20:13',
          //   aspectMode: 'cover',
          // },
          body: {
            type: 'box',
            layout: 'vertical',
            contents: [
              {
                type: 'text',
                text: 'Brown Cafe',
                weight: 'bold',
                size: 'xl',
              },
              {
                type: 'box',
                layout: 'vertical',
                margin: 'lg',
                spacing: 'sm',
                contents: [
                  {
                    type: 'box',
                    layout: 'baseline',
                    spacing: 'sm',
                    contents: [
                      {
                        type: 'text',
                        text: 'Place',
                        color: '#aaaaaa',
                        size: 'sm',
                        flex: 1,
                      },
                      {
                        type: 'text',
                        text: text,
                        wrap: true,
                        color: '#666666',
                        size: 'sm',
                        flex: 5,
                      },
                    ],
                  },
                  {
                    type: 'box',
                    layout: 'baseline',
                    spacing: 'sm',
                    contents: [
                      {
                        type: 'text',
                        text: 'Time',
                        color: '#aaaaaa',
                        size: 'sm',
                        flex: 1,
                      },
                      {
                        type: 'text',
                        text: '10:00 - 23:00',
                        wrap: true,
                        color: '#666666',
                        size: 'sm',
                        flex: 5,
                      },
                    ],
                  },
                ],
              },
            ],
          },
          footer: {
            type: 'box',
            layout: 'vertical',
            spacing: 'sm',
            contents: [
              {
                type: 'button',
                style: 'link',
                height: 'sm',
                action: {
                  type: 'uri',
                  label: 'OK',
                  uri: url,
                },
              },
              {
                type: 'button',
                style: 'link',
                height: 'sm',
                action: {
                  type: 'uri',
                  label: 'Hmm...',
                  uri: 'https://linecorp.com',
                },
              },
              {
                type: 'button',
                style: 'link',
                height: 'sm',
                action: {
                  type: 'uri',
                  label: 'NG',
                  uri: 'https://linecorp.com',
                },
              },
              {
                type: 'spacer',
                size: 'sm',
              },
            ],
            flex: 0,
          },
        },
      },
      // {
      //   type: 'text',
      //   text: `${text}\n${url}`,
      // },
    ])
  }
}
