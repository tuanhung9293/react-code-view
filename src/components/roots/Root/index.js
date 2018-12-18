import '../../../../node_modules/video-react/dist/video-react.css'
import React from 'react'
import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom'
import GeneralErrorBoundary from 'components/errors/GeneralErrorBoundary'
import NotFound from 'components/errors/NotFound'
import ScrollToTop from 'components/ui/ScrollToTop'
import ScreenContent from 'components/ui/ScreenContent'
import Collections from 'components/containers/pages/Collections'
import NasaSearch from 'components/containers/pages/NasaSearch'
import PlayMedia from 'components/containers/pages/PlayMedia'
import EditCollection from 'components/containers/pages/EditCollection'
import AddMedia from 'components/containers/pages/AddMedia'

export function Root() {
  return (
    <GeneralErrorBoundary>
      <BrowserRouter>
        <ScrollToTop>
          <ScreenContent>
            <Switch>
              <Route exact path="/" render={() => (<Redirect to="/collection" />)} />
              <Route path="/collection" component={Collections} />
              <Route path="/nasa-search" component={NasaSearch} />
              <Route path="/play-media/:source/:mediaId" component={PlayMedia} />
              <Route component={NotFound} />
            </Switch>
            <Route path="/collection/edit/:collectionId" component={EditCollection} />
            <Route path="/nasa-search/add-media/:mediaId" component={AddMedia} />
          </ScreenContent>
        </ScrollToTop>
      </BrowserRouter>
    </GeneralErrorBoundary>
  )
}

export default Root