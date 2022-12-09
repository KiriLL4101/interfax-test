import React from 'react'
import { Link } from 'react-router-dom'

import StarIcon from 'icon:../../assets/icons/star.svg'

import * as styles from './RepositoryItem.module.scss'

type RepositoryCardProps = RepositoryItem

export const RepositoryCard: React.FC<RepositoryCardProps> = (props) => {
  const { name, description, language, stargazers_count, owner: { login } } = props
  return (
    <div className={styles.repos}>
      <Link to={`/${login}/${name}`} className={styles.title}>
        {name}
      </Link>
      <p>{description}</p>
      <div>
        <span>{language}</span>
        <span>
          <StarIcon />
          {stargazers_count}
        </span>
      </div>
    </div>
  )
}
