import { FormEvent, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { Search } from '../../components/Search'

import * as styles from './SearchPage.module.scss'

export const SearchPage = () => {
  const [search, setSearch] = useState('')

  const navigate = useNavigate()

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    if (!search.trim()) return

    event.preventDefault()

    navigate(`/${search}`)
  }

  return (
    <div className={styles.root}>
      <form onSubmit={onSubmit}>
        <Search
          value={search}
          onChange={({ currentTarget }) => setSearch(currentTarget.value)}
          placeholder="Find your account GitHub..."
        />
      </form>
    </div>
  )
}
