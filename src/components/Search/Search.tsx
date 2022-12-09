import React from 'react'

import SearchIcon from 'icon:../../assets/icons/search.svg'

import * as styles from './Search.module.scss'

type SearchProps = React.InputHTMLAttributes<HTMLInputElement>

export const Search: React.FC<SearchProps> = ({ ...props }) => {
  return (
    <label className={styles.root}>
      <SearchIcon className={styles.icon} />
      <input className={styles.input} type="text" {...props} />
    </label>
  )
}
