<?php
namespace OCA\OwnNotes\Service;

use Exception;

use OCP\AppFramework\Db\DoesNotExistException;
use OCP\AppFramework\Db\MultipleObjectsReturnedException;

use OCA\OwnNotes\Db\Note;
use OCA\OwnNotes\Db\NoteMapper;


class NoteService {

    private $mapper;

    public function __construct(NoteMapper $mapper){
        $this->mapper = $mapper;
    }

    public function findAll($userId) {
        return $this->mapper->findAll($userId);
    }

    private function handleException ($e) {
        if ($e instanceof DoesNotExistException ||
            $e instanceof MultipleObjectsReturnedException) {
            throw new NotFoundException($e->getMessage());
        } else {
            throw $e;
        }
    }

    public function find($id, $userId) {
        try {
            return $this->mapper->find($id, $userId);

        // in order to be able to plug in different storage backends like files
        // for instance it is a good idea to turn storage related exceptions
        // into service related exceptions so controllers and service users
        // have to deal with only one type of exception
        } catch(Exception $e) {
            $this->handleException($e);
        }
    }

    public function create($objectId, $clientName, $facture , $userId) {
        error_reporting(E_ALL);
        ini_set('display_errors', 1);
        
        $note = new Note();
        $note->setObjectId($objectId);
        $note->setClientName($clientName);
        $note->setFacture($facture);
        $note->setUserId($userId);
        return $this->mapper->insert($note);
    }

    public function update($id, $objectId, $clientName, $facture , $userId) {
        try {
            $note = $this->mapper->find($id, $userId);
            $note->setObjectId($objectId);
            $note->setClientName($clientName);
            $note->setFacture($facture);
            return $this->mapper->update($note);
        } catch(Exception $e) {
            $this->handleException($e);
        }
    }

    public function delete($id, $userId) {
        try {
            $note = $this->mapper->find($id, $userId);
            $this->mapper->delete($note);
            return $note;
        } catch(Exception $e) {
            $this->handleException($e);
        }
    }

}