/**
 * Matching algorithm for DevTinder
 * Calculates compatibility scores between users based on skills, interests, and preferences
 */

// Calculate skill compatibility score
const calculateSkillScore = (userSkills, otherUserSkills) => {
  if (!userSkills.length || !otherUserSkills.length) return 0

  // Count matching skills
  const matchingSkills = userSkills.filter((skill) => otherUserSkills.includes(skill))

  // Calculate score based on percentage of matching skills
  return (matchingSkills.length / Math.max(userSkills.length, otherUserSkills.length)) * 50
}

// Calculate project interest compatibility
const calculateInterestScore = (userInterests, otherUserInterests) => {
  if (!userInterests || !otherUserInterests) return 0
  if (!userInterests.length || !otherUserInterests.length) return 0

  // Count matching interests
  const matchingInterests = userInterests.filter((interest) => otherUserInterests.includes(interest))

  // Calculate score based on percentage of matching interests
  return (matchingInterests.length / Math.max(userInterests.length, otherUserInterests.length)) * 30
}

// Calculate location compatibility (simple match/no match)
const calculateLocationScore = (userLocation, otherUserLocation) => {
  if (!userLocation || !otherUserLocation) return 0

  // Simple check if locations match (could be enhanced with distance calculation)
  return userLocation.toLowerCase() === otherUserLocation.toLowerCase() ? 20 : 0
}

// Main matching function
export const matchUsers = (currentUser, potentialMatches) => {
  const matches = potentialMatches.map((user) => {
    // Calculate individual scores
    const skillScore = calculateSkillScore(currentUser.skills, user.skills)
    const interestScore = calculateInterestScore(
      currentUser.preferences?.projectInterests || [],
      user.preferences?.projectInterests || [],
    )
    const locationScore = calculateLocationScore(currentUser.location, user.location)

    // Calculate total score (0-100)
    const totalScore = skillScore + interestScore + locationScore

    return {
      user: {
        id: user._id,
        name: user.name,
        title: user.title,
        bio: user.bio,
        skills: user.skills,
        location: user.location,
        avatar: user.avatar,
      },
      matchScore: Math.round(totalScore),
      skillCompatibility: Math.round((skillScore / 50) * 100), // Convert to percentage
      interestCompatibility: Math.round((interestScore / 30) * 100), // Convert to percentage
      locationMatch: locationScore > 0,
    }
  })

  // Sort by match score (highest first)
  return matches.sort((a, b) => b.matchScore - a.matchScore)
}
