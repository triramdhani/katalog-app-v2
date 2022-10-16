const findTag = (dummy) => {
  const tag = dummy.map(item => {
    return item.tag
  })
  let uniqueTag = [];
  tag.forEach((tag) => {
    if (!uniqueTag.includes(tag)) {
      uniqueTag.push(tag)
    }
  })
  return uniqueTag
}

export default findTag