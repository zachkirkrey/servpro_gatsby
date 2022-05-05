import React from 'react'
import ReactDOM from 'react-dom'
import { ReactComponent as StarFill } from '@images/svg/star-fill.svg'
import { ReactComponent as StarEmpty } from '@images/svg/star-empty.svg'

function replaceReview(copyRef) {
  if (!copyRef.current) {
    return
  }

  const review = copyRef.current.querySelector('.reviews-stars')
  if (!review) {
    return
  }

  const rating = review.dataset.rating
  const RenderRating = value => {
    return [...Array(5).keys()].map(i => {
      return i < value ? (
        <StarFill width={22} height={22} />
      ) : (
        <StarEmpty width={22} height={22} />
      )
    })
  }

  review.innerHTML = ''
  ReactDOM.render(RenderRating(rating), review)
}

export default replaceReview
