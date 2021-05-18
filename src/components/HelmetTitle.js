import { Helmet } from "react-helmet"

const HelmetTitle = ({ helmetTitle }) => {
  return (
    <Helmet>
      <title>{helmetTitle}</title>
    </Helmet>
  )
}

export default HelmetTitle;