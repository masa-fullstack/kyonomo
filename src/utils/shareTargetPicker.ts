export const shareTargetPicker = async () => {
  alert('start')
  const liff = (await import('@line/liff')).default
  alert('start2')
  await liff.ready
  alert('start3')
  if (liff.isApiAvailable('shareTargetPicker')) {
    alert('start4')
    const userId = await (await liff.getProfile()).userId
    alert(userId)
    liff
      .shareTargetPicker([
        {
          type: 'text',
          text: 'test',
        },
      ])
      .then(() => alert('startxx'))
    alert('start5')
  }
  alert('start6')
}
