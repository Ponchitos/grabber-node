'use strict'

const deleteTestText = 'DELETE FROM news WHERE id IN (SELECT id FROM news WHERE text = $1)'

module.exports = {
  deleteTestText
}
