package org.kevin.trello.config.cache

import org.springframework.boot.context.properties.ConfigurationProperties

@ConfigurationProperties(prefix = "cache")
class CacheProperties {
    var accountLifeMinutes: Long = 15L
    var accountMaxSize: Long = 128L
}