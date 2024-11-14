import { Header, Paragraph, List, ListItem, SummaryContainer } from '../ui'

export const SummaryDataForm = ({ userData }) => {
   const { firstName, lastName, email, phone, experiences, learningMode, technologies, cv } = userData
   return (
      <>
         <Header variant="h1">Dane z Formularza</Header>
         <SummaryContainer>
            <div>
               <Header variant="h2">Dane osobowe:</Header>
               <Paragraph>Imię: {firstName}</Paragraph>
               <Paragraph>Nazwisko: {lastName}</Paragraph>
               <Paragraph>E-mail: {email}</Paragraph>
               <Paragraph>Telefon: {phone}</Paragraph>
            </div>
            <div>
               <Header variant="h2">Doświadczenie w programowaniu:</Header>
               <List>
                  {experiences.length > 0 ? (
                     experiences.map(exp => (
                        <ListItem key={`${exp.technology}${exp.level}`}>
                           Technologia: {exp.technology} / poziom: {exp.level}
                        </ListItem>
                     ))
                  ) : (
                     <ListItem>Brak doświadczenia</ListItem>
                  )}
               </List>
            </div>
            <div>
               <Header variant="h2">Preferencje kursu:</Header>
               <Paragraph>Tryb kursu: {learningMode === 'offline' ? 'Stacjonarnie' : 'Online'}</Paragraph>
               <Paragraph>Preferowane technologie:</Paragraph>
               <List>
                  {technologies.map(tech => {
                     return <ListItem key={tech}>{tech}</ListItem>
                  })}
               </List>
            </div>
            <div>
               <Header variant="h2">Curriculum vitae:</Header>
               <img src={URL.createObjectURL(cv[0])} alt="" width={300} />
            </div>
         </SummaryContainer>
      </>
   )
}
