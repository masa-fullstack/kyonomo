export const shareTargetPicker = async (text: string) => {
  const liff = (await import('@line/liff')).default
  await liff.ready
  await liff.shareTargetPicker([
    {
      type: 'text',
      text: `${text}`,
    },
  ])
}
