export const shareTargetPicker = async (text: string, url: string) => {
  const liff = (await import('@line/liff')).default
  // await liff.ready
  if (liff.isApiAvailable('shareTargetPicker')) {
    await liff
      .shareTargetPicker([
        {
          type: 'flex',
          altText: 'this is a flex message',
          contents: {
            type: 'bubble', // ①
            body: {
              // ②
              type: 'box', // ③
              layout: 'vertical', // ④
              contents: [
                {
                  type: 'text',
                  text: 'Brown Cafe',
                  weight: 'bold',
                  size: 'xl',
                },
              ],
            },
          },
        },
        //     {
        //     type: 'bubble',
        //     // hero: {
        //     //   type: 'image',
        //     //   url: 'https://scdn.line-apps.com/n/channel_devcenter/img/fx/01_1_cafe.png',
        //     //   size: 'full',
        //     //   aspectRatio: '20:13',
        //     //   aspectMode: 'cover',
        //     // },
        //     body: {
        //       type: 'box',
        //       layout: 'vertical',
        //       contents: [
        //         {
        //           type: 'text',
        //           text: 'Brown Cafe',
        //           weight: 'bold',
        //           size: 'xl',
        //         },
        //         {
        //           type: 'box',
        //           layout: 'vertical',
        //           margin: 'lg',
        //           spacing: 'sm',
        //           contents: [
        //             {
        //               type: 'box',
        //               layout: 'baseline',
        //               spacing: 'sm',
        //               contents: [
        //                 {
        //                   type: 'text',
        //                   text: 'Place',
        //                   color: '#aaaaaa',
        //                   size: 'sm',
        //                   flex: 1,
        //                 },
        //                 {
        //                   type: 'text',
        //                   text: text,
        //                   wrap: true,
        //                   color: '#666666',
        //                   size: 'sm',
        //                   flex: 5,
        //                 },
        //               ],
        //             },
        //             {
        //               type: 'box',
        //               layout: 'baseline',
        //               spacing: 'sm',
        //               contents: [
        //                 {
        //                   type: 'text',
        //                   text: 'Time',
        //                   color: '#aaaaaa',
        //                   size: 'sm',
        //                   flex: 1,
        //                 },
        //                 {
        //                   type: 'text',
        //                   text: '10:00 - 23:00',
        //                   wrap: true,
        //                   color: '#666666',
        //                   size: 'sm',
        //                   flex: 5,
        //                 },
        //               ],
        //             },
        //           ],
        //         },
        //       ],
        //     },
        //     footer: {
        //       type: 'box',
        //       layout: 'vertical',
        //       spacing: 'sm',
        //       contents: [
        //         {
        //           type: 'button',
        //           style: 'link',
        //           height: 'sm',
        //           action: {
        //             type: 'uri',
        //             label: 'OK',
        //             uri: 'https://liff.line.me/1656164238-QBJ8Kzky',
        //           },
        //         },
        //         {
        //           type: 'button',
        //           style: 'link',
        //           height: 'sm',
        //           action: {
        //             type: 'uri',
        //             label: 'Hmm...',
        //             uri: 'https://liff.line.me/1656164238-pA6oXKvj',
        //           },
        //         },
        //         {
        //           type: 'button',
        //           style: 'link',
        //           height: 'sm',
        //           action: {
        //             type: 'uri',
        //             label: 'NG',
        //             uri: 'https://liff.line.me/1656164238-PajlAG3E',
        //           },
        //         },
        //         {
        //           type: 'spacer',
        //           size: 'sm',
        //         },
        //       ],
        //       flex: 0,
        //     },
        //   },
        // },
        // {
        //   type: 'template',
        //   altText: 'This is a buttons template',
        //   template: {
        //     type: 'buttons',
        //     thumbnailImageUrl: 'https://example.com/bot/images/image.jpg',
        //     imageAspectRatio: 'rectangle',
        //     imageSize: 'cover',
        //     imageBackgroundColor: '#FFFFFF',
        //     title: 'Menu',
        //     text: 'Please select',
        //     defaultAction: {
        //       type: 'uri',
        //       label: 'View detail',
        //       uri: 'http://example.com/page/123',
        //     },
        //     actions: [
        //       {
        //         type: 'postback',
        //         label: 'Buy',
        //         data: 'action=buy&itemid=123',
        //       },
        //       {
        //         type: 'postback',
        //         label: 'Add to cart',
        //         data: 'action=add&itemid=123',
        //       },
        //       {
        //         type: 'uri',
        //         label: 'View detail',
        //         uri: 'http://example.com/page/123',
        //       },
        //     ],
        //   },
        // },
        // {
        //   type: 'text',
        //   text: `${text}\n${url}`,
        // },
      ])
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.log(error)
        // eslint-disable-next-line no-console
        console.log(text)
        // eslint-disable-next-line no-console
        console.log(url)
      })
  }
}
