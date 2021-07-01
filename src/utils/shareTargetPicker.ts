export const shareTargetPicker = async (text: string, url: string) => {
  const liff = (await import('@line/liff')).default
  await liff.ready
  if (liff.isApiAvailable('shareTargetPicker')) {
    liff.shareTargetPicker([
      {
        type: 'text',
        text: `${text}\n${url}`,
      },
    ])
  }
}
