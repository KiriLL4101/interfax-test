import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import { getCommitsByRepositoriesName } from '../../api/githubService'
import { Loader } from '../../components/Loader'

import * as styles from './RepositoryInfoPage.module.scss'

export const RepositoryInfoPage = () => {
  const [commits, setCommits] = useState<CommitInfo[] | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  const { login, shu } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    if (!shu?.trim() || !login?.trim()) return

    setIsLoading(true)
    getCommitsByRepositoriesName(login, shu)
      .then((data) => {
        setCommits(data)
      })
      .catch((error) => {
        setCommits(null)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }, [login, shu])

  return (
    <div className={styles.root}>
      <div className={styles.header}>
        <h3>{shu}</h3>
        <button onClick={() => navigate(-1)} className={styles.back}>
          Back
        </button>
      </div>
      <ul className={styles.list}>
        {commits && !isLoading ? (
          commits.map((com) => (
            <li key={com.sha} className={styles.commit}>
              <a href={`${com.html_url}`} target="_blank">
                {com.sha}
              </a>
              <div>
                {com?.author?.avatar_url && <img src={com.author.avatar_url} alt="Avatar" />}
                {com?.author?.login && <span>{com.author.login}</span>}
                committed <span>{com.commit.committer.date}</span>
              </div>
            </li>
          ))
        ) : (
          <Loader />
        )}
      </ul>
    </div>
  )
}
