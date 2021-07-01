export const shareTargetPicker = async (text: string) => {
  alert('start')
  const liff = (await import('@line/liff')).default
  alert('start2')
  await liff.ready
  alert('start3')
  if (liff.isApiAvailable('shareTargetPicker')) {
    alert('start4')
    await liff.shareTargetPicker([
      {
        type: 'text',
        text: `${text}`,
      },
    ])
    alert('start5')
  }
  alert('start6')
}
