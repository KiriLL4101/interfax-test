import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'

import { fetchAuthorInfo, searchRepositoriesByLogin } from '../../api/githubService'
import { Loader } from '../../components/Loader'
import { RepositoryCard } from '../../components/RepositoryItem'

import * as styles from './UserPage.module.scss'

export const UserPage = () => {
  const [user, setUser] = useState<GitHubUserInfo | null>(null)
  const [repositoryData, setRepositoryData] = useState<RepositoryItem[]>()
  const [isLoading, setIsLoading] = useState(true)

  const { login } = useParams()

  const fetchUserData = async (login: string) => {
    setIsLoading(true)
    try {
      const resUser = await fetchAuthorInfo(login)
      const resRepositories = await searchRepositoriesByLogin(login)

      setUser(resUser)
      setRepositoryData(resRepositories)
    } catch (error) {
      setUser(null)
      // notification(error)
    } finally {
      setIsLoading(false)
    }
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
          {isLoading ? (
            <Loader />
          ) : (
            <>
              <span>User not found</span>
              <Link to={'/'} className={styles.back}>
                Back
              </Link>
            </>
          )}
        </div>
      )}
    </>
  )
}
