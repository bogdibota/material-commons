import { Link as GatsbyLink } from 'gatsby';
import isAbsoluteUrl from 'is-absolute-url';
import React from 'react';

const Link = ({ to, ...props }) =>
  isAbsoluteUrl(to) ? (
    <a href={ to } { ...props } />
  ) : (
    <GatsbyLink to={ to } { ...props } />
  );

export default Link;
