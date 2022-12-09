export const searchRepositoriesByLogin = (login: string): Promise<RepositoryItem[]> => {
  return fetch(`https://api.github.com/users/${login}/repos`).then((res) => {
    if (res.ok) return res.json()
    throw new Error(res.statusText || 'Status code error :' + res.status)
  })
}

export const fetchAuthorInfo = (profile: string): Promise<GitHubUserInfo> => {
  return fetch(`https://api.github.com/users/${profile}`).then((res) => {
    if (res.ok) return res.json()
    throw new Error(res.statusText || 'Status code error :' + res.status)
  })
}
