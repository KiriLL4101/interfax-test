import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'

import { fetchAuthorInfo, searchRepositoriesByLogin } from '../../api/githubService'
import { RepositoryCard } from '../../components/RepositoryItem'

import * as styles from './UserPage.module.scss'

const UserPage = () => {
  const { login } = useParams()

  const [user, setUser] = useState<GitHubUserInfo | null>(null)
  const [repositoryData, setRepositoryData] = useState<RepositoryItem[]>()

  const fetchUserData = async (login: string) => {
    try {
      const response = await fetchAuthorInfo(login)
      setUser(response)
    } catch (error) {
      setUser(null)
      return
    }
    const response = await searchRepositoriesByLogin(login)
    setRepositoryData(response)
  }

  useEffect(() => {
    if (!login?.trim()) return

    fetchUserData(login)
  }, [login])

  return (
    <>
      {user ? (
        <div className={styles.root}>
          <div className={styles.info}>
            <img className={styles.avatar} src={user.avatar_url} alt="Avatar" />
            <h3>{user.login}</h3>
            <p>{user.name}</p>
          </div>
          <div className={styles.wrap}>
            {repositoryData &&
              repositoryData.length > 0 &&
              repositoryData.map((item) => <RepositoryCard key={item.id} {...item} />)}
          </div>
        </div>
      ) : (
        <div className={styles.notFound}>
          <span>User not found</span>
          <Link to={'/'} className={styles.back}>
            Back
          </Link>
        </div>
      )}
    </>
  )
}

export default UserPage
