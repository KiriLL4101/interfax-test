import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import { getCommitsByRepositoriesName } from '../../api/githubService'
import { Loader } from '../../components/Loader'
import { formatDate } from '../../utils'

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
          commits.map((com) => {
            const { avatar_url, login } = com.author
            const dateFormatted = formatDate(new Date(com.commit.committer.date).getTime())

            return (
              <li key={com.sha} className={styles.commit}>
                <a href={`${com.html_url}`} target="_blank">
                  {com.sha}
                </a>
                <div>
                  {avatar_url && <img src={avatar_url} alt="Avatar" />}
                  {login && <span>{login}</span>}
                  committed <span>{dateFormatted}</span>
                </div>
              </li>
            )
          })
        ) : (
          <Loader />
        )}
      </ul>
    </div>
  )
}
