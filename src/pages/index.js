import React from "react"
import { Link, graphql } from "gatsby"
import Img from 'gatsby-image'

import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"

const IndexPage = ({data}) => (
  <Layout>
    <SEO title="Home" keywords={[`gatsby`, `application`, `react`]} />
    <h1>Hi people</h1>
    <Img fluid={data.imageOne.childImageSharp.fluid} />
    <section className="grid">
    {data.allMarkdownRemark.edges.map(({ node }) => (
      <article className="post" key={node.id}>
      <Link style={{ boxShadow: `none` }} to={node.fields.slug}>
      <Img sizes={node.frontmatter.featuredImage.childImageSharp.fluid} />
      <h3>
          {node.frontmatter.title}{" "}
          <small>
            - {node.frontmatter.date}
          </small>
        </h3>
      </Link>
        <p>{node.excerpt}</p>

      </article>
    ))}
    </section>
  </Layout>
)

export default IndexPage

export const query = graphql`
  query Test {
    imageOne: file(relativePath: { eq: "JdV_S16_Programme-photo-3.jpg" }) {
      childImageSharp {
        fluid(maxWidth: 2000) {
          ...GatsbyImageSharpFluid
        }
      }
    }
    allMarkdownRemark (sort: { order: ASC, fields: [frontmatter___date]}) {
      totalCount
      edges {
        node {
          id
          frontmatter {
            title
            date(formatString: "DD MMMM YYYY", locale: "fr")
            
            featuredImage {
              childImageSharp {
                fluid(maxWidth: 1500) {
                  ...GatsbyImageSharpFluid_noBase64
                }
              }
            }
          }
          excerpt
          fields {
            slug
          }
        }
      }
    }



  }
`
