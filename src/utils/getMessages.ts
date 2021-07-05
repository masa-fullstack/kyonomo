/* eslint-disable @typescript-eslint/no-unused-vars */
import { SendMessagesParams } from '@line/liff/dist/lib/api/sendMessages'

type GetMessage = (
  id: string,
  isLiff: boolean,
  okURL: string,
  hmURL: string,
  ngURL: string,
  answerURL: string,
  subject?: string,
  place?: string,
  time?: string,
  text?: string
) => SendMessagesParams

export const getMessages: GetMessage = (id, isLiff, okURL, hmURL, ngURL, answerURL, subject, place, time, text) => {
  const messages: SendMessagesParams = [
    {
      type: 'flex',
      altText: subject,
      contents: {
        type: 'bubble',
        hero: {
          type: 'image',
          url: 'https://kyonomo.vercel.app/images/HEADER.png',
          size: 'full',
          aspectRatio: '2:1',
          aspectMode: 'cover',
        },
        body: {
          type: 'box',
          layout: 'vertical',
          contents: [
            {
              type: 'text',
              text: subject,
              wrap: true,
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
                      text: place,
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
                      text: time,
                      wrap: true,
                      color: '#666666',
                      size: 'sm',
                      flex: 5,
                    },
                  ],
                },
              ],
            },
            {
              type: 'text',
              text: text ? text : ' ',
              wrap: true,
              margin: 'md',
              size: 'sm',
            },
          ],
        },
        footer: {
          type: 'box',
          layout: 'vertical',
          spacing: 'xxl',
          contents: [
            {
              type: 'box',
              layout: 'vertical',
              contents: [
                {
                  type: 'button',
                  style: 'link',
                  height: 'sm',
                  action: {
                    type: 'uri',
                    label: 'OK🍻',
                    uri: `${okURL}?id=${id}&isLiff=${isLiff}`,
                  },
                  color: '#FFFFFF',
                },
              ],
              backgroundColor: '#3b82f6',
              cornerRadius: 'xl',
              paddingAll: 'md',
            },
            {
              type: 'box',
              layout: 'vertical',
              contents: [
                {
                  type: 'button',
                  style: 'link',
                  height: 'sm',
                  action: {
                    type: 'uri',
                    label: 'Hmm...🤔',
                    uri: `${hmURL}?id=${id}&isLiff=${isLiff}`,
                  },
                  color: '#FFFFFF',
                },
              ],
              backgroundColor: '#fbbf24',
              cornerRadius: 'xl',
              paddingAll: 'md',
            },
            {
              type: 'box',
              layout: 'vertical',
              contents: [
                {
                  type: 'button',
                  style: 'link',
                  height: 'sm',
                  action: {
                    type: 'uri',
                    label: 'NG🙅‍♂️',
                    uri: `${ngURL}?id=${id}&isLiff=${isLiff}`,
                  },
                  color: '#FFFFFF',
                },
              ],
              backgroundColor: '#f87171',
              paddingAll: 'md',
              cornerRadius: 'xl',
            },
            {
              type: 'button',
              style: 'link',
              height: 'sm',
              action: {
                type: 'uri',
                label: 'コメント付き回答／回答確認',
                uri: `${answerURL}?id=${id}&isLiff=${isLiff}`,
              },
              color: '#000000',
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
  ]

  return messages
}
